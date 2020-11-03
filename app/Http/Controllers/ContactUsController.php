<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactUsPostRequest;
use App\Notifications\ContactUsNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ContactUsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('contact-us');
    }

    public function store(ContactUsPostRequest $request)
    {
        Notification::route('mail', config('mail.contact_email'))
                    ->notify(new ContactUsNotification($request->only(['name', 'email', 'question'])));

        return response()->noContent();
    }
}
