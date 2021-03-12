<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/clear-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    // return what you want
});

Route::prefix('auth')->group(function () {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('register', 'App\Http\Controllers\AuthController@register');
});

Route::middleware('auth:sanctum')->prefix('user')->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::post('update-me', 'App\Http\Controllers\UserController@update');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('my-projects', 'App\Http\Controllers\ProjectController@myProjects');
    Route::get('my-project', 'App\Http\Controllers\ProjectController@myProject');
    Route::post('add-project', 'App\Http\Controllers\ProjectController@addProject');

    Route::get('my-portfolios', 'App\Http\Controllers\ProjectController@myPortfolios');

    Route::get('all-customers', 'App\Http\Controllers\UserController@allCustomers');
    Route::get('customer-list', 'App\Http\Controllers\UserController@customerList');
    Route::post('change-password', 'App\Http\Controllers\UserController@changePassword');

    Route::get('all-files', 'App\Http\Controllers\FileController@allFiles');
    Route::post('add-file', 'App\Http\Controllers\FileController@addFile');

    Route::get('all-updates', 'App\Http\Controllers\UpdateController@allUpdates');

    Route::get('unread-messages', 'App\Http\Controllers\MessageController@unreadMessages');
    Route::get('my-messages', 'App\Http\Controllers\MessageController@myMessages');
    Route::post('send-message', 'App\Http\Controllers\MessageController@sendMessage');

    Route::get('my-roadmaps', 'App\Http\Controllers\RoadmapController@myRoadmaps');

    Route::get('app-dashboard-charts', 'App\Http\Controllers\DashboardAppController@get_charts');

    Route::middleware('auth:sanctum')->prefix('backend')->group(function () {
        Route::get('user/me', function (Request $request) {
            return [
                'code' => 200,
                'data' => $request->user()
            ];
        });

        Route::get('user/all', 'App\Http\Controllers\BackendController@allUsers');
        Route::get('user/{id}', 'App\Http\Controllers\BackendController@singleUser');
        Route::get('dashboard/stats', 'App\Http\Controllers\DashboardAppController@getStats');
        Route::post('register', 'App\Http\Controllers\AuthController@register');

        Route::get('staff/all', 'App\Http\Controllers\BackendController@allStaffs');
        Route::get('staff/{id}', 'App\Http\Controllers\BackendController@showStaff');
        Route::post('staff/create', 'App\Http\Controllers\BackendController@storeStaff');
        Route::post('staff/update', 'App\Http\Controllers\BackendController@updateStaff');
        Route::post('staff/delete', 'App\Http\Controllers\BackendController@deleteStaff');

        Route::get('task-template/all', 'App\Http\Controllers\BackendController@allTaskTemplates');
        Route::get('task-template/{id}', 'App\Http\Controllers\BackendController@showTaskTemplate');
        Route::post('task-template/create', 'App\Http\Controllers\BackendController@storeTaskTemplate');
        Route::post('task-template/update', 'App\Http\Controllers\BackendController@updateTaskTemplate');
        Route::post('task-template/delete', 'App\Http\Controllers\BackendController@deleteTaskTemplate');

        Route::get('project/all', 'App\Http\Controllers\BackendController@allProjects');
        Route::get('project/{id}', 'App\Http\Controllers\BackendController@showProject');
        Route::post('project/create', 'App\Http\Controllers\BackendController@storeProject');
        Route::post('project/update', 'App\Http\Controllers\BackendController@updateProject');
        Route::post('project/set-target', 'App\Http\Controllers\BackendController@setProjectTarget');
        Route::post('project/delete', 'App\Http\Controllers\BackendController@deleteProject');
        Route::post('project/move-to-portfolio', 'App\Http\Controllers\BackendController@moveToPortfolio');

        Route::get('portfolio/all', 'App\Http\Controllers\BackendController@allPortfolios');

        Route::post('file/create', 'App\Http\Controllers\BackendController@storeFile');
        Route::post('taskupdate/create', 'App\Http\Controllers\BackendController@storeTaskUpdate');

        Route::get('task/all', 'App\Http\Controllers\BackendController@allTasks');
        Route::get('task/{id}', 'App\Http\Controllers\BackendController@showTask');
        Route::post('task/create', 'App\Http\Controllers\BackendController@storeTask');
        Route::post('task/update', 'App\Http\Controllers\BackendController@updateTask');
        Route::post('task/delete', 'App\Http\Controllers\BackendController@deleteTask');

        Route::get('equity/all', 'App\Http\Controllers\BackendController@allEquities');
        Route::get('equity/{id}', 'App\Http\Controllers\BackendController@showEquity');
        Route::post('equity/create', 'App\Http\Controllers\BackendController@storeEquity');
        Route::post('equity/update', 'App\Http\Controllers\BackendController@updateEquity');
        Route::post('equity/delete', 'App\Http\Controllers\BackendController@deleteEquity');

        Route::get('roadmap/all/{id?}', 'App\Http\Controllers\BackendController@allRoadmaps');
        Route::get('roadmap/{id}', 'App\Http\Controllers\BackendController@showRoadmap');
        Route::post('roadmap/create', 'App\Http\Controllers\BackendController@storeRoadmap');
        Route::post('roadmap/update', 'App\Http\Controllers\BackendController@updateRoadmap');
        Route::post('roadmap/delete', 'App\Http\Controllers\BackendController@deleteRoadmap');

        Route::get('message/all/{userid}', 'App\Http\Controllers\BackendController@allMessages');
        Route::get('message/unread-count/{userid}', 'App\Http\Controllers\BackendController@unreadMessageCount');
        Route::post('message/send', 'App\Http\Controllers\BackendController@sendMessage');


        Route::post('user/change-password', 'App\Http\Controllers\BackendController@changePassword');
        Route::post('user/update', 'App\Http\Controllers\BackendController@updateUser');
        Route::post('user/update-status', 'App\Http\Controllers\BackendController@updateUserStatus');
        Route::post('user/send-invitation', 'App\Http\Controllers\BackendController@sendUserInvitation');

    });
});
