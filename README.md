
# コンパイルの仕方
```
npx google-closure-compiler \
  --js='closure-library-master/clo''sure/goog/base.js' \
  --js='closure-library-master/closure/goog/**/*.js' \
  --js='!closure-library-master/closure/goog/**/*_test.js' \
  --js='!closure-library-master/closure/goog/**/testing/**/*.js' \
  --js='src/app.js' \
  --entry_point='app.todo' \
  --compilation_level=ADVANCED \
  --jscomp_error=checkTypes \
  --js_output_file='dist/bundle.js'
```
