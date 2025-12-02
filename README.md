
# コンパイルの仕方
## とりあえずこれ
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

## 厳しいやつ
```
npx google-closure-compiler \                    [~/Sites/closurelibrary/practice 17:40]
  --js='closure-library-master/closure/goog/base.js' \
  --js='closure-library-master/closure/goog/**/*.js' \
  --js='!closure-library-master/closure/goog/**/*_test.js' \
  --js='!closure-library-master/closure/goog/**/testing/**/*.js' \
  --js='src/app.js' \
  --entry_point='app.todo' \
  --jscomp_error=checkTypes \
  --jscomp_error=strictCheckTypes \
  --warning_level=VERBOSE \
  --hide_warnings_for='closure-library-master/' \
  --js_output_file='dist/bundle.js'
```