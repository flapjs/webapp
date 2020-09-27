# If you are releasing to production...
- [ ] Increment the version number.
    - [ ] Make sure the version number in package.json is updated.
    - [ ] Make sure CHANGELOG.md is updated (and dated).
- [ ] Run `npm start` and verify everything is working in `development` mode.
- [ ] Merge into master.
- [ ] Run `npm run build` to deploy the web app.
- [ ] Check the website url to make sure everything is working properly in `production` mode.
    - Make sure in the console, it says it is in the `production` environment.
