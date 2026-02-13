@echo off
echo Initializing Git repository...
git init
git add .
git commit -m "feat: complete portfolio refactor"
git branch -M main
git remote add origin https://github.com/Abiram070207/my-portfolio.git
echo Pushing to GitHub...
git push -u origin main
pause
