# Install

```bash
curl https://pyenv.run | bash


vim ~/.bashrc
### ~/.bashrc:
  export PYENV_ROOT="$HOME/.pyenv"
  [[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
  eval "$(pyenv init -)"
###


pyenv virtualenv advent
pyenv activate advent


pip install pip-tools

pip-compile ./requirements.in
pip-sync
```