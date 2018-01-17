# Web goes Native: Progressive Web Apps (PWA) with Angular—in Action!

[ng-europe](https://ngeurope.org/#pwa-workshop), February 1-2, 2018, 09:00-17:30, Espace Charenton, Paris.

Your trainers: [Christian Weyer](https://twitter.com/christianweyer), [Christian Liebel](https://twitter.com/chris_liebel), [Steffen Jahr](https://twitter.com/steffenjahr), Thinktecture.

## Setup

As we are expecting a high number of participants and we’ve seen a lot of unreliable conference WiFis, we kindly ask you to prepare the following setup steps at home or in the hotel.

### Step 1: Devices and Software

Please bring your developer devices and install the following software. [Already done? Click here for step 2.](#step-2-demo-repository)

**NOTE:** As web technologies move fast and quickly, there might be new releases in the meantime. To ensure everything works as intended, we strictly recommend you to stick to the versions noted below.

#### Devices
- Laptop with recent Windows/macOS/Linux version
- Optional: Android smartphone/tablet with recent Android and Chrome version

#### Browsers (Desktop)
- [Google Chrome](https://www.google.de/chrome/browser/desktop/), version 63
- Optional: [Mozilla Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/), version 58
- Optional: [Google Chrome Canary](https://www.google.com/chrome/browser/canary.html), version 65

#### Developer Tools
- [Git](https://git-scm.com/) (obviously)
  - Optional: Git UI tool such as TortoiseGit, Tower, SourceTree, GitKraken, …
- [Node.js](https://nodejs.org/en/), version 8.9.4 LTS
- Editor of your choice
  - [WebStorm](https://www.jetbrains.com/webstorm/) 2017.3.3 (commercial, free trial)
  - [Visual Studio Code](https://code.visualstudio.com/), recent version
  - Notepad, vi, …

### Step 2: Demo Repository

On your favorite terminal, please run:

```
npm uninstall -g angular-cli @angular/cli
npm cache clear
npm install -g @angular/cli@1.6.4
```

Next, navigate to a folder of your choice and execute:

```
git clone https://github.com/thinktecture/ngeurope-2018-pwa.git
cd ngeurope-2018-pwa/api
npm install   # or yarn install (if installed)
cd ../client
npm install   # or yarn install (if installed)
```

If you prefer SSH, you can use this checkout URL: `git@github.com:thinktecture/ngeurope-2018-pwa.git`