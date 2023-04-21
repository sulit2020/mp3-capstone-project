<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Customer::select('id','firstname','lastname','image','address','phone')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'firstname'=>'required',
            'lastname'=>'required',
            'image'=>'required|image',
            'address'=>'required',
            'phone'=>'required',
        ]);

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('customer/image', $request->image,$imageName);
            Customer::create($request->post()+['image'=>$imageName]);

            return response()->json([
                'message'=>'Customer Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a customer!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return response()->json([
            'customer'=>$customer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'firstname'=>'required',
            'lastname'=>'required',
            'image'=>'nullable',
            'address'=>'required',
            'phone'=>'required',
        ]);

        try{

            $customer->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($customer->image){
                    $exists = Storage::disk('public')->exists("customer/image/{$customer->image}");
                    if($exists){
                        Storage::disk('public')->delete("customer/image/{$customer->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('customer/image', $request->image,$imageName);
                $customer->image = $imageName;
                $customer->save();
            }

            return response()->json([
                'message'=>'Customer Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a customer!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        try {

            if($customer->image){
                $exists = Storage::disk('public')->exists("customer/image/{$customer->image}");
                if($exists){
                    Storage::disk('public')->delete("customer/image/{$customer->image}");
                }
            }

            $customer->delete();

            return response()->json([
                'message'=>'Customer Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a customer!!'
            ]);
        }
    }
}
