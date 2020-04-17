#!/bin/bash

data=$(date +%Y-%m-%d)

branch=$(git branch)
branch=${branch: -10}

if [ $branch != $data ];
	then
	
	echo -e "\n\nFazendo checkout para novo branch...\n\n"
	git checkout -b $data

fi

	echo -e "\nAdicionando arquivos...\n"
	git add *

	info="info"
	echo -e "\nDescreva as mudanças\n"
	read -e info

	echo -e "\n\nFazendo commit...\n\n"
	git commit -m $data" edit"

	echo -e "\n\nFazendo push...\n\n"
	git push origin $data

	echo -e "\n\nPronto!\n\n"

read

exit

$SHELL