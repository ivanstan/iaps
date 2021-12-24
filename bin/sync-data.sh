#!/usr/bin/env bash
set -e

rsync -arvz -e 'ssh -p 2233' --rsync-path=~/bin/rsync --progress --delete  ./var/data glutenfr@ivanstanojevic.me:~/projects/dev.ivanstanojevic.me/current/var
