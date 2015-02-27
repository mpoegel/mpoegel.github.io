# ==============================================================================
# Gather language statistics from a series of github repositories
# Ouput to a csv
#
# ==============================================================================
import os

# ------------------------------------------------------------------------------
if (__name__ == '__main__'):

	language_totals = dict()

	langs = {
		'JavaScript': ['.js'],
		'C++': ['.cpp', '.h'],
		'C': ['.c'],
		'Matlab': ['.m', '.mat'],
		'HTML': ['.htm', '.html'],
		'CSS': ['.css'],
		'Markdown': ['.md', '.markdown'],
		'Python': ['.py'],
		'Lua': ['.lua'],
		'Arduino': ['.ino'],
		'Shell': ['.sh'],
		'PHP': ['.php'],
		'XML': ['.xml']
	}

	banned = ['bootstrap', 'jquery', 'test', '.meteor', '.git', '.cache',
		'.vagrant', 'numeric-1.2.6', 'MathBox-bundle', 'domready']
	flag = False

	ext_to_lang = dict()
	for lang,exts in langs.items():
		for e in exts:
			ext_to_lang[e] = lang

	bad_exts = set()

	for root, dirs, files in os.walk(os.getcwd()):
		for name in files:
			ext = os.path.splitext(name)[1].lower().strip()
			if (ext in ext_to_lang.keys()):
				f = os.path.join(root,name)
				for b in banned:
					if (b in name or b in f):
						flag = True
						break
				if (flag): continue
				f_size = os.path.getsize(f)
				if (ext_to_lang[ext] in language_totals):
					language_totals[ext_to_lang[ext]] += f_size
				else:
					language_totals[ext_to_lang[ext]] = f_size
			else:
				bad_exts.add(ext)
			flag = False


	out_file = open('lang_stats.csv', 'w')
	for lang,total in language_totals.items():
		out_file.write(lang + ',' + str(total) + '\n')

	out_file.close()
