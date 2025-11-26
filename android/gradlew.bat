@ECHO OFF
SET DIR=%~dp0
SET WRAPPER=%DIR%gradle\wrapper\gradle-wrapper.jar
IF NOT EXIST %WRAPPER% (
  ECHO Gradle wrapper JAR missing. Please run "gradle wrapper" to generate it.
  EXIT /B 1
)
java -Xmx64m -jar %WRAPPER% %*
