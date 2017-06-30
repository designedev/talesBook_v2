#!/usr/bin/env bash

BASEDIR=${PWD}/..
echo "Script location: ${BASEDIR}"


echo "=============================KILL PROCESS================================="
kill -9 `cat {BASEDIR}/tmp/pids/server.pid`
rc=$?;
if [[ $rc != 0 ]]; then echo "===== ERROR ON STOPPING PUMA SERVER ====="; exit $rc; fi
echo "===== PULL SOURCE CODE FROM GIT ====="
cd ..
git pull
if [[ $rc != 0 ]]; then echo "===== ERROR ON STOPPING PUMA SERVER ====="; exit $rc; fi 
cd ng
