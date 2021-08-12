<?php /** @noinspection ALL */

namespace Deployer;

require 'recipe/symfony.php';

set('repository', 'https://github.com/ivanstan/iaps');
set('git_tty', true);
set('bin_dir', 'bin');
set('http_user', 'glutenfr');
set('writable_mode', 'chmod');
set('default_stage', 'production');
set('bin/composer', '~/bin/composer.phar');
set('composer_options', '{{composer_action}} --verbose --prefer-dist --no-progress --no-interaction --optimize-autoloader');
add('shared_files', [
    '.env.local',
]);

host('ivanstanojevic.me')
    ->user('glutenfr')
    ->port(2233)
    ->stage('production')
    ->set('deploy_path', '~/projects/dev.ivanstanojevic.me');

task('test', function () {
    set('symfony_env', 'test');
    runLocally('bin/phpunit');
});

task('deploy:dump-env', function () {
    run('cd {{release_path}} && {{bin/composer}} dump-env prod');
});

task('deploy:executable', function () {
    run('chmod +x bin/console');
});

task(
    'deploy',
    [
        'deploy:info',
        'deploy:prepare',
        'deploy:lock',
        'deploy:release',
        'deploy:update_code',
        'deploy:clear_paths',
        'deploy:create_cache_dir',
        'deploy:shared',
        'deploy:assets',
        'deploy:writable',
        'deploy:vendors',
        'deploy:executable',
        'deploy:cache:warmup',
        'deploy:dump-env',
        'database:migrate',
        'deploy:symlink',
        'deploy:unlock',
        'cleanup',
    ]
);

//before('deploy', 'test');
after('deploy:failed', 'deploy:unlock');
