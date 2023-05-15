//Collection of functions needed to make the resume website work properly and have fun features

function changePageTitle() {
    potentialArray = [
        "went to the moon",
        "is reading your emails",
        "is not from Earth",
        "is wondering if you notice this",
        "likes ducks",
        "is playing Animal Crossing",
        "doesn't like Kyle Busch",
        "doesn't like you",
        "loves Red Bull",
        "is not James Acaster",
        "says you should hit F5",
        "is actually Toast",
        "is a simulation",
        "is an AI",
        "loves 🤘death metal🤘",
        "is a fan of grapes",
        "has roid rage 🏋️‍♂️"];

    newPageTitle = "Tom Cast " + potentialArray[Math.floor(Math.random() * potentialArray.length)]
    document.title = newPageTitle;
}
