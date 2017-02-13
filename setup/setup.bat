@echo off
start nodesetup.msi /passive
start postgresqlsetup.exe --mode unattended --unattendedmodeui minimal --password password
