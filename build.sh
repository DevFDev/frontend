#!/bin/sh

# 최상위 디렉토리로 이동
cd "$(dirname "$0")"/..

# output 디렉토리 생성 (이미 존재하면 삭제 후 생성)
rm -rf output
mkdir output

# frontend 폴더 내 모든 파일을 output으로 복사
cp -R ./frontend/* ./output

# 확인을 위해 echo 메시지 추가
echo "Files copied to output directory."