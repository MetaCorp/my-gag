'use strict';

/**
 * @ngdoc function
 * @name myGagApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myGagApp
 */
angular.module('myGagApp')
    .controller('MainCtrl', function (user, Users, Templates, Objects, Device) {

        var vm = this;

        vm.user = Users.get(user.uid);
        vm.templates = Templates.all;
        vm.objects = Objects.all;

        vm.memeTitle = '';
        vm.memeObjects = [];

        vm.menuClosed = false;
        vm.isMobile = Device.isMobile();

        if (vm.isMobile)
            vm.mwidth = Device.getWidth() - 30;
        else
            vm.mwidth = -1;

        vm.mheight = Device.getHeight() - 64;

        vm.rwidth = Device.getWidth();
        vm.rheight = Device.getHeight();
        console.log('isMobile:', vm.isMobile);
        console.log('w:' + Device.getWidth() + ' h:' + Device.getHeight());

        vm.meme = {
            title: '',
            template: null,
            objects: [],
            top_text: '',
            bottom_text: ''
        };

        vm.addObject = function (object) {
            console.log('object:', object);
            vm.memeObjects.push(object);

            if (vm.isMobile)
                vm.menuClosed = true;
        };

        vm.selectTemplate = function (template) {
            console.log('template:', template);
            vm.meme.template = template;
            vm.meme.bottom_text = template.bottom_text;
            vm.meme.top_text = template.top_text;
            vm.meme.objects = [];

            if (vm.isMobile)
                vm.menuClosed = true;
        };

        vm.clearMeme = function () {
            vm.meme = {
                title: '',
                template: null,
                objects: [],
                top_text: '',
                bottom_text: ''
            };
        };

        vm.downloadMeme = function () {
            var canvas = document.getElementById('canvas');
            var image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            // here is the most important part because if you dont replace you will get a DOM 18 exception.
            window.location.href = image; // it will save locally

            if (vm.meme.template.title === '_custom') return;

            vm.meme.template = vm.meme.template.$id;
            vm.meme.title = vm.memeTitle;
            vm.meme.objects = vm.memeObjects;
            Users.postMeme(user.uid, vm.meme);
        };

        vm.addFile = function () {
            var file = document.querySelector('input[type="file"]').files[0];
            var reader = new FileReader();

            if (file) {
                reader.onload = function (e) {
                    vm.meme.template = {
                        url: e.target.result,
                        title: '_custom'
                    };
                    vm.meme.bottom_text = 'bottom text';
                    vm.meme.top_text = 'top text';
                };

                reader.readAsDataURL(file);
            }
        };

    });
