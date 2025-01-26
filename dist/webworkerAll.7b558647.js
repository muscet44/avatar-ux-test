!function(){function t(t,e,o,n){Object.defineProperty(t,e,{get:o,set:n,enumerable:!0,configurable:!0})}var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire94c2,o=e.register;o("iLIWI",function(t,o){e("4CWuG"),e("4alNp"),e("1UDqa"),e("43R8l"),e("kFlq6"),e("cyk3L"),e("cwU5j"),e("3Yn7Z"),e("8GsbD"),e("23ozm"),e("g4hSm"),e("eIbPD")}),o("cG8uY",function(e,o){t(e.exports,"State",function(){return r});let n={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},i=class t{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(1&this.data)}set blend(t){!!(1&this.data)!==t&&(this.data^=1)}get offsets(){return!!(2&this.data)}set offsets(t){!!(2&this.data)!==t&&(this.data^=2)}set cullMode(t){if("none"===t){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace="front"===t}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(4&this.data)}set culling(t){!!(4&this.data)!==t&&(this.data^=4)}get depthTest(){return!!(8&this.data)}set depthTest(t){!!(8&this.data)!==t&&(this.data^=8)}get depthMask(){return!!(32&this.data)}set depthMask(t){!!(32&this.data)!==t&&(this.data^=32)}get clockwiseFrontFace(){return!!(16&this.data)}set clockwiseFrontFace(t){!!(16&this.data)!==t&&(this.data^=16)}get blendMode(){return this._blendMode}set blendMode(t){this.blend="none"!==t,this._blendMode=t,this._blendModeId=n[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){let e=new t;return e.depthTest=!1,e.blend=!0,e}};i.default2d=i.for2d();let r=i}),o("fSBSb",function(e,o){t(e.exports,"color32BitToUniform",function(){return n});function n(t,e,o){let n=(t>>24&255)/255;e[o++]=(255&t)/255*n,e[o++]=(t>>8&255)/255*n,e[o++]=(t>>16&255)/255*n,e[o++]=n}}),o("iFPuJ",function(e,o){t(e.exports,"BatchableSprite",function(){return n});class n{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}}}),o("3pKBw",function(e,o){t(e.exports,"localUniformBit",function(){return n}),t(e.exports,"localUniformBitGroup2",function(){return i}),t(e.exports,"localUniformBitGl",function(){return r});let n={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},i={...n,vertex:{...n.vertex,header:n.vertex.header.replace("group(1)","group(2)")}},r={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}}})}();
//# sourceMappingURL=webworkerAll.7b558647.js.map
