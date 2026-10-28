"""Save the current committed project and publish the static site without force pushes."""
from pathlib import Path
import subprocess
repo=Path(__file__).resolve().parent.parent
def git(*args):
 return subprocess.check_output(['git',*args],cwd=repo,text=True).strip()
if git('status','--porcelain'):
 raise SystemExit('Commit all intended changes before publishing; working tree must be clean.')
git('fetch','origin','refs/heads/gh-pages:refs/remotes/origin/gh-pages')
tree=git('rev-parse','HEAD:vila-parque')
parent=git('rev-parse','origin/gh-pages')
git('push','origin','HEAD:main')
if tree != git('rev-parse','origin/gh-pages^{tree}'):
 commit=git('-c','user.name=Codex','-c','user.email=codex@users.noreply.github.com','commit-tree',tree,'-p',parent,'-m','Publish current Vila Parque website')
 git('push','origin',commit+':refs/heads/gh-pages')
print('Saved to main and gh-pages. Verify the native Pages deployment before claiming publication.')
print('https://viniciusgomesferreirasilva.github.io/VG-curr-culos-IA/')
