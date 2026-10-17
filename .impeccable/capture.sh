#!/bin/sh
# usage: capture.sh  -> portfolio + prototypes review captures
P=E:/Projetos/hsbueno-portfolio; R=$P/.impeccable/review; Q=$P/.impeccable/proto-review
C="/c/Program Files/Google/Chrome/Application/chrome.exe"
rm -rf $R $Q; mkdir -p $R/crops $Q
shot(){ "$C" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --window-size=$1 --virtual-time-budget=7000 --screenshot="$2" "$3" >/dev/null 2>&1; }
shot 1440,8200 $R/desktop.png "file:///$P/index.html"
shot 1440,900 $R/desktop-viewport.png "file:///$P/index.html"
shot 600,11500 $R/mf.png "file:///$P/.impeccable/frame-tall.html?..%2Findex.html"
shot 600,900 $R/mvp.png "file:///$P/.impeccable/frame-vp.html?..%2Findex.html"
for s in chaveiro acougue padaria oficina barbearia esmalteria marmoraria advocacia odontologia energia-solar construtora interiores; do
  shot 600,5000 $Q/$s-mf.png "file:///$P/.impeccable/frame.html?..%2Fprototipos%2F$s%2Findex.html"
  shot 1440,3600 $Q/$s-desktop.png "file:///$P/prototipos/$s/index.html"
done
for i in $(seq 1 90); do n=$(ls $R/*.png $Q/*.png 2>/dev/null | wc -l); [ $n -ge 28 ] && break; sleep 2; done; sleep 4
cd $R && ffmpeg -loglevel error -y -i mf.png -vf crop=390:11500:0:0 mobile.png && ffmpeg -loglevel error -y -i mvp.png -vf crop=390:844:0:0 mobile-viewport.png && rm mf.png mvp.png
for i in 0 1 2 3; do ffmpeg -loglevel error -y -i mobile.png -vf "crop=390:2400:0:$((i*2400))" crops/m$((i+1)).png; ffmpeg -loglevel error -y -i desktop.png -vf "crop=1440:2050:0:$((i*2050)),scale=720:-1" crops/d$((i+1)).png; done
cd $Q && for s in chaveiro acougue padaria oficina barbearia esmalteria marmoraria advocacia odontologia energia-solar construtora interiores; do ffmpeg -loglevel error -y -i $s-mf.png -vf crop=390:5000:0:0 $s-mobile.png; ffmpeg -loglevel error -y -i $s-mf.png -vf "crop=390:430:0:0,scale=585:-1:flags=lanczos" -q:v 4 $P/img/p-$s.jpg; rm $s-mf.png; done
ls $R $Q
