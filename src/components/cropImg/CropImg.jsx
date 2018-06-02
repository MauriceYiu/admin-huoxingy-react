/* eslint-disable */
import React, { Component } from 'react';
import './cropImg.scss';
import './jquery.Jcrop.min.css';
import { upBossPayCode } from './../../api/employee';

class CropImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            startX: 0,
            startY: 0,
            imgWidth: 0,
            imgHeight: 0
        };
        this.initCrop = this.initCrop.bind(this);
        this.crop = this.crop.bind(this);
    }
    render() {
        let imgBase = this.props.imgBase;
        return (
            <div id="crop-img" onClick={this.props.cancelCrop}>
                <div className="img-wrap" onClick={(e) => e.stopPropagation()}>
                    <div className="wrap-tit">图片裁剪</div>
                    <div className="img">
                        <img src={imgBase} alt="" id="img-for-crop" />
                    </div>
                    <div className="crop-button">
                        <button className="cancel" onClick={this.props.cancelCrop}>取消</button>
                        <button className="crop" onClick={this.crop}>裁剪</button>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        let imgBase = this.props.imgBase;
        let imgObj = new Image();
        imgObj.src = imgBase;

        imgObj.onload = () => {
            console.log(imgObj.width);
            if (imgObj.width / imgObj.height > 4 / 3) {
                $('#img-for-crop').width(400);
                this.setState({
                    scale: imgObj.width / 400
                });
            } else {
                $('#img-for-crop').height(300);
                this.setState({
                    scale: imgObj.height / 300
                });
            }
            console.log("scale" + this.state.scale);
            this.initCrop();
        }

    }

    initCrop() {
        const { cropImgWidth, cropImgHeight } = this.props;
        let jcrop_api,
            boundx,
            boundy,

            xsize = cropImgWidth,
            ysize = cropImgHeight;
        $('#img-for-crop').Jcrop({
            aspectRatio: 1,
            onChange: updatePreview,
            onSelect: updatePreview
        }, function () {
            let bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
        });
        let _this = this;
        function updatePreview(c) {
            console.log(c);
            if (parseInt(c.w) > 0) {
                let rx = xsize / c.w;
                let ry = ysize / c.h;
                _this.setState({
                    startX: c.x,
                    startY: c.y,
                    imgWidth: c.w,
                    imgHeight: c.h
                });
            }
        };
    }
    async crop() {
        let storeId = localStorage.getItem('storeId');
        // 如果没有裁切图片的话，直接保存原图片
        if (!this.state.startX && !this.state.imgWidth) {
            upBossPayCode(storeId, this.props.imgBase);
            let res;
            try {
                res = await upBossPayCode(storeId, this.props.imgBase);
                this.props.getCropImgUrl(res.path);
                return;
            } catch (error) {
                console.log(error);
            }
            return;
        }

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        const { scale, startX, startY, imgWidth, imgHeight } = this.state;

        console.log(scale, startX, startY, imgWidth, imgHeight)

        const { cropImgWidth, cropImgHeight } = this.props;
        let img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = this.props.imgBase;
        img.onload = async () => {
            canvas.width = cropImgWidth;
            canvas.height = cropImgHeight;
            ctx.drawImage(img, scale * startX, scale * startY, scale * imgWidth, scale * imgHeight, 0, 0, cropImgWidth, cropImgHeight);
            let res;
            try {
                res = await upBossPayCode(storeId, canvas.toDataURL());
                this.props.getCropImgUrl(res.path);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default CropImg;