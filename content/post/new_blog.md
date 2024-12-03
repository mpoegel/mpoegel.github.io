+++
date = '2024-11-25T00:05:40Z'
draft = false
title = 'New Blog in the Old Homelab'
+++

I refactored my blog to use hugo, so now is as good a time as any to introduce my homelab setup.

To start, I'm running an ACEMAGICIAN mini PC in my cabinet. It has an AMD Ryzen 7 5800U processor with 8 cores/16 threads, 16GB DDR4 of RAM, and a 512GB SSD--plenty enough power to run a few virtual machines on the cheap. They're also very power efficient!

On the mini PC, I've installed [proxmox](https://www.proxmox.com/). I did this because in order to learn more about virtualization and experiment more freely. With proxmox, I can quickly spin up a new VM and destroy it if I lose interest or mess up.

Actually instead of using full VMs, I run [linux containers](https://linuxcontainers.org/), or LXCs. In one of these containers I've installed [caddy](https://caddyserver.com/). I chose Caddy because
1. it was something new, and
2. it has a very simple configuration for serving static files.

The entire contents of the `Caddyfile` is as follows.
```
# Pick the port number
8002 {
        # Set this path to your site's directory.
        root * /srv/mpoegel.github.io

        # Enable the static file server.
        file_server
}
```

Then I just needed to write a systemd file to start the caddy service.

```
[Unit]
Description=Caddy mpoegel.github.io Server
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=notify
User=caddy
Group=caddy
ExecStart=/usr/bin/caddy run --environ --config /etc/caddy-mpoegel/Caddyfile
ExecReload=/usr/bin/caddy reload --config /etc/caddy-mpoegel/Caddyfile --force
TimeoutStopSec=5s
LimitNOFILE=1048576
LimitNPROC=512
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
```

With the service running, I need a way to route traffic to the container. The first problem to solve is that I needed a static IP address. Getting a public, static IP address for my home router can be challenge, but getting a public, static IP address from a public cloud provider comes with the territory. Oracle Cloud has a generous [free tier](https://www.oracle.com/cloud/free/) that I've used to create a moderate VM.

Now I needed another reverse proxy to connect the OPC VM with my caddy VM, and for that I chose [envoy proxy](https://www.envoyproxy.io/). A more powerful proxy, envoy can provide an ingress for incoming HTTP traffic and route to the appropriate upstream VM based on the Server Name Indicator (SNI) of the downstream connection. I'll talk more about my envoy configuration in a later post. Now the hybrid homelab looks like this.

<div style="text-align:center; padding:10px;">
<img src="/img/posts/caddy_homelab.png"/>
</div>

But how can I securely connect the OPC VM with my homelab VM? A good option is to create a virtual private network that contains both virtual machines. [Tailscale](https://tailscale.com/) offers an easily setup VPN with a generous free tier of 100 machines. So I defined the Access Control List (ACL) in Tailscale to allow connections between my OPC VM and caddy VM on the one specific port running my caddy server.

The final step was to obtain certificates for the envoy proxy to use HTTPS. The obvious choice for this is [Let's Encrypt](https://letsencrypt.org/).
