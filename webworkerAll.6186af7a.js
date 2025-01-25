function o(o,e,r,t){Object.defineProperty(o,e,{get:r,set:t,enumerable:!0,configurable:!0})}var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire94c2,r=e.register;r("i6XA8",function(o,r){e("54Ykb"),e("cqGna"),e("6PbjS"),e("jjbq7"),e("l3cJr"),e("2dQTG"),e("68VbR"),e("b3jdr"),e("hmfYL"),e("ibWjW"),e("9q1mQ"),e("1LtXF")}),r("8n8Vu",function(e,r){o(e.exports,"color32BitToUniform",function(){return t});function t(o,e,r){let t=(o>>24&255)/255;e[r++]=(255&o)/255*t,e[r++]=(o>>8&255)/255*t,e[r++]=(o>>16&255)/255*t,e[r++]=t}}),r("dXAM5",function(e,r){o(e.exports,"BatchableSprite",function(){return t});class t{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}}}),r("dvARM",function(e,r){o(e.exports,"localUniformBit",function(){return t}),o(e.exports,"localUniformBitGroup2",function(){return n}),o(e.exports,"localUniformBitGl",function(){return i});let t={name:"local-uniform-bit",vertex:{header:`

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
        `}},n={...t,vertex:{...t.vertex,header:t.vertex.header.replace("group(1)","group(2)")}},i={name:"local-uniform-bit",vertex:{header:`

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
        `}}});
//# sourceMappingURL=webworkerAll.6186af7a.js.map
