# Stantz

👻 I ain't afriad of no cache.

## What?
Its a CLI for looking aina  list of files, for a list of file names and adding or replacing an `v=?{hash}` to the end of the path.

## Usage

`stantz -t path/to/my/header-scripts.html path/to/my/footer-scripts.html -f styles.css app.min.js`

```bash
Usage: -t <target> -f <file>

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  -t, --target  The file(s) to check for links to cachebust   [array] [required]
  -f, --file    The file name(s) (e.g. style.css, app.js, etc [array] [required]
```