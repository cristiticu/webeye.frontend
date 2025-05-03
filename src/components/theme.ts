// system.ts or theme.ts
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
    globalCss: {
        html: {
            colorPalette: 'brand',
            fontFamily: 'body',
            background: 'brand.500',
        },
        body: {
            background: 'transparent',
        },
    },
    theme: {
        tokens: {
            fonts: {
                body: { value: 'Geist, sans-serif' },
            },
            gradients: {
                simple: { value: 'linear-gradient(to right, red, blue)' },
            },
            colors: {
                brand: {
                    50: { value: '#ebf8ff' },
                    100: { value: '#bee3f8' },
                    200: { value: '#90cdf4' },
                    300: { value: '#63b3ed' },
                    400: { value: '#4299e1' },
                    500: { value: '#3182ce' },
                    600: { value: '#2b6cb0' },
                    700: { value: '#2c5282' },
                    800: { value: '#2a4365' },
                    900: { value: '#1A365D' },
                    950: { value: '#0b2545' },
                },
                red: {
                    100: { value: '#ffe5e5' },
                    500: { value: '#f56565' },
                    700: { value: '#c53030' },
                },
                green: {
                    100: { value: '#e6fffa' },
                    500: { value: '#48bb78' },
                    700: { value: '#2f855a' },
                },
                yellow: {
                    100: { value: '#fffbea' },
                    500: { value: '#ecc94b' },
                    700: { value: '#b7791f' },
                },
                blue: {
                    100: { value: '#ebf8ff' },
                    500: { value: '#4299e1' },
                    700: { value: '#2b6cb0' },
                },
            },
        },

        semanticTokens: {
            colors: {
                brand: {
                    solid: { value: '{colors.brand.500}' },
                    contrast: { value: '{colors.brand.100}' },
                    fg: { value: '{colors.brand.700}' },
                    muted: { value: '{colors.brand.100}' },
                    subtle: { value: '{colors.brand.200}' },
                    emphasized: { value: '{colors.brand.300}' },
                    focusRing: { value: '{colors.brand.500}' },
                },
                danger: {
                    DEFAULT: { value: { base: '{colors.red.500}', _hover: '{colors.red.950}' } },
                    fg: { value: { base: '{colors.red.700}', _hover: '{colors.red.950}' } },
                    bg: { value: '{colors.red.100}' },
                },
                success: {
                    DEFAULT: { value: '{colors.green.500}' },
                    fg: { value: '{colors.green.700}' },
                    bg: { value: '{colors.green.100}' },
                },
                warning: {
                    DEFAULT: { value: '{colors.yellow.500}' },
                    fg: { value: '{colors.yellow.700}' },
                    bg: { value: '{colors.yellow.100}' },
                },
                info: {
                    DEFAULT: { value: '{colors.blue.500}' },
                    fg: { value: '{colors.blue.700}' },
                    bg: { value: '{colors.blue.100}' },
                },
            },
        },
    },
});

export const system = createSystem(defaultConfig, customConfig);
