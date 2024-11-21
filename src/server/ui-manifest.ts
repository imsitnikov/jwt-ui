import path from 'path';

export const uiManifest = path.resolve(
    path.parse(require.main!.filename).dir,
    '../public/build',
    'assets-manifest.json',
);
