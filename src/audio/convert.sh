#!/bin/bash

for file in *.mp4; do
  filename="${file%%.*}";
  ffmpeg -i $file -af "silenceremove=start_periods=1:start_duration=1:start_threshold=-60dB:detection=peak,aformat=dblp,areverse,silenceremove=start_periods=1:start_duration=1:start_threshold=-60dB:detection=peak,aformat=dblp,areverse" "mp3/$filename.mp3"
done;

audiosprite mp3/*.mp3 -f howler -o ./motivation
