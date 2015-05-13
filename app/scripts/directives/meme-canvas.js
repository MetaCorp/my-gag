'use strict';

/**
 * @ngdoc directive
 * @name myGagApp.directive:memeCanvas
 * @description
 * # memeCanvas
 */
angular.module('myGagApp')
    .directive('memecanvas', function () {
        return {
            restrict: 'A',
            scope: {
                val: '=',
                obj: '=',
                mwidth: '=',

            },
            link: function ($scope, element) {
                var canvas = new fabric.Canvas(element[0]);
                var cwidth = 500;
                var fontSize = 30;

                if ($scope.mwidth !== -1) {
                    cwidth = $scope.mwidth;
                    fontSize = 20;
                }

                var canvasWrapper = document.getElementById('memecanvas');
                canvasWrapper.tabIndex = 1000;
                canvasWrapper.addEventListener('keydown', function (e) {
                    if (e.keyCode === 8)
                        canvas.remove(canvas.getActiveObject());
                }, false);

                canvas.setWidth(cwidth);
                canvas.setHeight(0);

                canvas.on({
                    'mouse:down': function (e) {
                        if (e.target && e.target.selectable) {
                            e.target.opacity = 0.5;
                            canvas.renderAll();
                        }
                    },
                    'mouse:up': function (e) {
                        if (e.target && e.target.selectable) {
                            e.target.opacity = 1;
                            canvas.renderAll();
                        }
                    },
                    'object:moved': function (e) {
                        if (e.target.selectable)
                            e.target.opacity = 0.5;
                    },
                    'object:modified': function (e) {
                        if (e.target.selectable)
                            e.target.opacity = 1;
                    }
                });

                $scope.$watch('val', function (newValue) {
                    console.log('newValue:', newValue);
                    if (newValue) { /* NEW VALUE */
                        canvas.clear();
                        console.log('New value :' + newValue.length);
                        var meme = newValue;
                        if (meme === undefined || meme.template === null || meme.template.url === undefined) {
                            canvas.setHeight(0);
                            return;
                        }
                        fabric.Image.fromURL(meme.template.url, function (oImg) {
                            /*canvas.setWidth(500);*/
                            console.log('height ' + oImg.height);
                            var newHeight = oImg.height * canvas.getWidth() / oImg.width;
                            canvas.setHeight(newHeight);

                            oImg.top = 0;
                            oImg.width = canvas.width;
                            oImg.height = newHeight;
                            oImg.selectable = false;

                            canvas.add(oImg);
                            oImg.moveTo(0);

                            var top_text = new fabric.IText(meme.top_text.toUpperCase(), {
                                left: canvas.getWidth() / 2,
                                top: 20,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fill: '#FFF',
                                stroke: '#000',
                                strokeWidth: 2,
                                fontFamily: 'impact',
                                fontSize: fontSize,
                                hasControls: false,
                                hasBorders: false
                            });

                            top_text.left = top_text.left - top_text.width / 2;

                            var bottom_text = new fabric.IText(meme.bottom_text.toUpperCase(), {
                                left: canvas.getWidth() / 2,
                                top: canvas.getHeight() - 60,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fill: '#FFF',
                                stroke: '#000',
                                strokeWidth: 2,
                                fontFamily: 'impact',
                                fontSize: fontSize,
                                hasControls: false,
                                hasBorders: false
                            });
                            bottom_text.left = bottom_text.left - bottom_text.width / 2;

                            canvas.add(top_text);
                            top_text.moveTo(2);
                            canvas.add(bottom_text);
                            bottom_text.moveTo(2);

                            top_text.on('changed', function (e) {
                                if (top_text.width > 450)
                                    indentText(top_text);

                                top_text.left = canvas.getWidth() / 2 - top_text.width / 2;
                            });
                            bottom_text.on('changed', function (e) {
                                if (bottom_text.width > 450)
                                    indentText(bottom_text);

                                bottom_text.left = canvas.getWidth() / 2 - bottom_text.width / 2;
                            });
                        });

                    }
                }, true);

                $scope.$watchCollection('obj', function (newValue, oldValue) {
                    console.log('newValue:', newValue);
                    if (newValue && newValue.length > oldValue.length) {
                        console.log('New object');
                        var object = newValue[newValue.length - 1];
                        //newValue.forEach(function (object) {
                        fabric.Image.fromURL(object.url, function (oImg) {
                            oImg.height = oImg.height * 80 / oImg.width;
                            oImg.width = 80;
                            canvas.add(oImg);
                            oImg.moveTo(1);
                            oImg.set({
                                borderColor: 'red',
                                cornerSize: 5,
                                transparentCorners: true
                            });

                            if ($scope.mwidth !== -1)
                                oImg.cornerSize = 20;
                        });
                        //});

                    }
                });

                var indentText = function (iText) {
                    var text = iText.text;

                    var n = text.lastIndexOf(' ');

                    var out = '';
                    if (n > 0)
                        out = text.substring(0, n) + '\n' + text.substring(n + 1);
                    else
                        out = text + '\n';

                    iText.text = out;
                };
            }
        };
    });
