#!/bin/bash

gh pr list --state open | grep -E "^[0-9].*\bBump.*dependabot\b" | cut -f 1 | sort | while read -r prId ; do

  echo "Processing $prId"
	retries=0

  echo "Try code review"
	gh pr review $prId --approve

	while [ $retries -lt 3 ] 
	do


    echo "Try merge $retries"
		gh pr merge $prId --rebase
 
		if [ $? -eq 1 ] 
    then
      echo "Sleep for a minute $retries"
			sleep 1m
			retries=$(( $retries + 1 ))
		else
			break
		fi

	done

done
