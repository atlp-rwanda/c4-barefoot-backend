# Description

This PR contains changes that set up testing environments both locally and on Travis. It also moves swagger.ts file in `./src/config` and nodemon.json in `./`

## Type of change

Please check the options that are relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [X] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

# How should this be manually tested or reproduced?

- Clone this repo
- Checkout to `ch-setup-testing-env`
- Run the command `npm i`
- Run the command `npm run test` to run tests locally 
- If you push new changes, the test shall run on travis

# Checklist:

- [X] My code follows the style guidelines of this project
- [X] I have performed a self-review of my own code
- [X] I have commented my code, particularly in hard-to-understand areas
- [X] I have made corresponding changes to the documentation
- [X] My changes generate no new warnings
- [X] I have added tests that prove my fix is effective or that my feature works
- [X] New and existing unit tests pass locally with my changes
- [X] Any dependent changes have been merged and published in downstream modules

# Screenshots (if applicable)