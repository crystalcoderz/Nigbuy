'use strict';

$(document).ready( function () {
    $('#landing-page').click( function () {
        $(this).addClass('slide-out').on('animationend', function () {
            $(this).addClass('hidden');
        });

        $('#main-content').removeClass('hidden');
        const video = document.getElementById('background-video');
        video.muted = false;
        video.play();

        const animations = [
            { selector: '#main-box', animation: 'slide-down' },
            { selector: '#button-1', animation: 'slide-right' },
            { selector: '#button-2', animation: 'slide-left' },
            { selector: '#button-3', animation: 'slide-up' },
            { selector: '#button-4', animation: 'slide-up' },
            { selector: '#button-5', animation: 'slide-up' },
            { selector: '#footer', animation: 'slide-up' }
        ];

        animations.forEach(({ selector, animation }) => {
            $(selector).addClass(animation);
        });

        new Typed('#typed-text', {
            strings: ['full-stack/bot developer', 'currency-exchanger'],
            typeSpeed: 100,
            startDelay: 3,
            backSpeed: 50,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: false,
            smartBackspace: true,
        });

        const tooltips = {};
        $('[data-tooltip]').each( function () {
            let delay = 0;
            let placement = 'bottom';
            if (['mute-button', 'pause-button'].includes(this.id)) {
                placement = 'top';
                delay = 300;
            };
            tooltips[this.id] = tippy(this, {
                content: $(this).data('tooltip'),
                allowHTML: false,
                animateFill: true,
                arrow: true,
                delay: delay,
                followCursor: false,
                hideOnClick: false,
                inlinePositioning: true,
                interactiveBorder: 2,
                interactiveDebounce: 0,
                maxWidth: 'none',
                placement: placement,
                touch: 'hold',
                animation: 'shift-away',
                onShow(instance) {
                    instance.popper.style.opacity = '0';
                    requestAnimationFrame(() => {
                        instance.popper.style.transition = 'opacity 0.3s';
                        instance.popper.style.opacity = '1';
                    });
                },
                onHide(instance) {
                    instance.popper.style.opacity = '0';
                },
            });
        });

        $('#discord-tool').click( function () {
            const data = $(this).data('tooltip');

            navigator.clipboard.writeText(data)
                .then(() => {
                    tooltips[this.id].setContent('Copied to Clipboard!');
                })
                .catch(err => tooltips[this.id].setContent('Failed to Copy to Clipboard!'))
                .finally(() => {
                    setTimeout(() => {
                        tooltips[this.id].setContent(data);
                    }, 3000);
                });
        });

        $('#github-tool, #telegram-tool').click( function () {
            window.open($(this).data('href'), '_blank');
        });

        const muteButton = $('#mute-button');
        muteButton.click( function () {
            video.muted = !video.muted;
            if (video.muted) {
                muteButton.removeClass('fa-volume-up').addClass('fa-volume-mute');
                tooltips[this.id].setContent('Unmute');
            }
            else {
                muteButton.removeClass('fa-volume-mute').addClass('fa-volume-up');
                tooltips[this.id].setContent('Mute');
            };
        });

        const pauseButton = $('#pause-button');
        pauseButton.click( function () {
            if (video.paused) {
                video.play();
                pauseButton.removeClass('fa-play').addClass('fa-pause');
                tooltips[this.id].setContent('Pause');
            }
            else {
                video.pause();
                pauseButton.removeClass('fa-pause').addClass('fa-play');
                pauseButton.data('tooltip', 'Play');
                tooltips[this.id].setContent('Play');
            };
        });

        let currentIndex = 0;
        const name = document.title;
        setInterval(() => {
            if (currentIndex > name.length) {
                currentIndex = 0;
            }
            const newName = name.substring(0, currentIndex);
            if (document.title !== newName) {
                document.title = newName;
                currentIndex++;
            }
        }, 500);
    });
});
