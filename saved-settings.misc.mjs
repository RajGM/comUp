function getSavedOptions() {
    const defaultShortSeekSeconds = 3;
    const defaultMediumSeekSeconds = 15;

    return new Promise(resolve => {
        chrome.storage.sync.get({
            "ctrl.leftArrow": defaultShortSeekSeconds,
            "ctrl.rightArrow": defaultShortSeekSeconds,
            "ctrl.shift.leftArrow": defaultMediumSeekSeconds,
            "ctrl.shift.rightArrow": defaultMediumSeekSeconds,

            "showRewindControlButtons": undefined,
            "showFastForwardControlButtons": undefined,

            "showShortRewindButton": true,
            "showLongRewindButton": true,
            "showShortForwardButton": true,
            "showLongForwardButton": true,

            "showSeekButtonTooltips": true,

            "useRectangularStyleButtons": false,

            "enableYoutubeComHotkeys": true,
            "enableNonYoutubeComHotkeys": true,

            "enableTimePositionMemoryForClickedSeekBar": false, // todo, set this to true once beta ends.
            "enableTimePositionMemoryForPageReloads": false, // todo, set this to true once beta ends.
        }, resolve);
    }).then(values => {
        // Migrate their saved settings.
        // The 2 old settings determine their default values for the 4 new settings.
        if (values.showRewindControlButtons !== undefined) {
            values.showShortRewindButton = values.showRewindControlButtons;
            values.showLongRewindButton = values.showRewindControlButtons;
            delete values.showRewindControlButtons;
        }
        if (values.showFastForwardControlButtons !== undefined) {
            values.showShortForwardButton = values.showFastForwardControlButtons;
            values.showLongForwardButton = values.showFastForwardControlButtons;
            delete values.showFastForwardControlButtons;
        }
        return values;
    });
}


export {getSavedOptions};
