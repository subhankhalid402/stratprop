<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardAppController extends Controller
{
    public function get_charts()
    {
        return [
            'portfolios' => [
                [['x' => Carbon::parse("01-01-2021")->format('c'), 'y' => 1], ['x' => Carbon::parse("01-02-2021")->format('c'), 'y' => 2], ['x' => Carbon::parse("01-03-2021")->format('c'), 'y' => 3], ['x' => Carbon::parse("01-04-2021")->format('c'), 'y' => 4]],
                [['x' => Carbon::parse("01-01-2021")->format('c'), 'y' => 400], ['x' => Carbon::parse("01-02-2021")->format('c'), 'y' => 350], ['x' => Carbon::parse("01-03-2021")->format('c'), 'y' => 300], ['x' => Carbon::parse("01-04-2021")->format('c'), 'y' => 250]],
            ],
            'target_income_per_month' => Auth::user()->deposit_amount,
            'current_target_equity' => Auth::user()->max_purchase_amount,
            'income_percentage' => rand(1,100),
            'equity_percentage' => rand(1,100),
            'total_asset_value' => rand(1,100),
            'total_cashflow' => rand(1,100),
            'total_equity' => rand(1,100),
        ];
    }

    public function getStats()
    {
        $Projects = Project::all();

        $total_users = User::where('role', 'User')->count();
        $total_projects  = Project::count();
        $total_portfolios = $Projects->where('type', 'portfolio')->count();
        $total_staff = User::where('role', 'Staff')->count();

        $today = Carbon::today();
        $clone_date = clone $today;
        $projects = Project::where('date', '>', $clone_date->subDays(7))->get();
        $day_wise_projects = array();
        $i = 6;

        while ($i >= 0)
        {
            $dayOfWeek = clone $today;
            $dayOfWeek = $dayOfWeek->subDays($i);
            $dayOfWeek->format('D');
            $projectsForThisDay = $projects->where('date', $dayOfWeek->format('Y-m-d'));
            $day_wise_projects[$dayOfWeek->format('D')] = $projectsForThisDay->count();
            $i--;
        }

        $first_day_of_month = new Carbon('first day of this month');
        $month_wise_projects = array();
        $i = 6;

        while ($i >= 0)
        {
            $clone_first_day_of_month = clone $first_day_of_month;

            $projectsForThisMonth = Project::whereMonth('date', $clone_first_day_of_month->subMonths($i)->format('m'))->whereYear('date', $clone_first_day_of_month->format('Y'))->get();
            $month_wise_projects[$clone_first_day_of_month->format('M')] = $projectsForThisMonth->count();
            $i--;
        }

        $output = [
                'code' => 200,
                'data' => [
                    'total_users' => $total_users,
                    'total_projects' => $total_projects,
                    'total_portfolios' => $total_portfolios,
                    'total_staff' => $total_staff,
                    'day_wise_projects' => [
                        'data' => array_values((array)$day_wise_projects),
                        'labels' => array_keys((array)$day_wise_projects)
                    ],
                    'month_wise_projects' => [
                        'labels' => array_keys((array)$month_wise_projects),
                        'data' => [
                            'all' => array_values((array)$month_wise_projects)
                        ]
                    ],
                ]
            ];

            return response()->json($output);

    }

    private function random_colors($count)
    {
        $arr = [];
        for($i = 1; $i <= $count; $i++)
        {
            $arr[] = '#' . substr(str_shuffle('ABCDEF0123456789'), 0, 6);
        }

        return $arr;
    }
}
