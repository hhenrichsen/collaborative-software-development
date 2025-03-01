#version 300 es
precision highp float;

#include "@motion-canvas/core/shaders/common.glsl"

uniform float radius;

void main() {
    vec4 inColor = texture(sourceTexture, sourceUV);
    vec4 mip = texture(sourceTexture, sourceUV, log2(radius));

    outColor = inColor;

    outColor.rgb += radius * dFdx(mip.rgb) * vec3(2, 0, -2);
}


