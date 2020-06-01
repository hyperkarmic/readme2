# Hints and Tips :tada:

1. This is a purely node cli task, there’s no jQuery here, there’s no html and css - we’re focusing purely on JavaScript.

1. Remember we aren’t opening the script through html in the browser now, we’re going through node’s cli - so we would be calling our index.js file in the terminal with `node index.js`

1. To ask the questions we need to capture the response from the user, one of the activities that we did used the `inquirer` npm package. Maybe that will be useful here?

   - Inquirer has some different options for getting a user input separate to just entering a string, perhaps it has some kind of multiple choices for certain requirements?

1. In order to write the README file, perhaps we can leverage a way of interacting with the file system through the package `fs` like we did in one of the activities.

1. You’ve got a separate file that you need to give your question's answers to where you will generate the markdown for the file `generateMarkdown`

1. You can create a multiline string to help your formatting when creating the markdown e.g.

```
const multiLineToReturn = `something
*something else*
Something


Something
`
```

> - This homework is bringing together all the concepts that we’ve done this week, it’s super important to go back through each of the activities and understand what we did in each.
>
> - Everything inside of the Good README is required, all the sections that will be where the marks are!

---

# Submission Checklist :rocket:

1. Ensure that you submit both a link to your homework repo and a video of your application working!
   > Check for sneaky console errors and leftover console logs!
2. Ensure what you've submitted works when you grade it yourself against the:

   - The user stories provided
   - The acceptance criteria's provided.

3. Make sure your homework repo has a quality README that _you_ have written, and provide screenshots **and a github video of your application working!**

   - To do this there's lots of screen capture software available however the standard operating system should work fine:

     1. Mac OS: You should be able to use QuickTime player to screen record.
     1. Windows: You should be able to use a built in Screen Recorder as part of the Windows Game Bar, https://betanews.com/2019/01/14/windows-10-screen-recorder-ultility/

     > If neither of these work then a safe bet is to look at OBS but the UI can be a bit clunky at first :thumbsup:

4. Commit after most changes, all that code doesn't just appear first time :wink:

5. **Comment that JavaScript code :pray:**
