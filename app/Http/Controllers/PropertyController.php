<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'listing_type' => 'required|in:sale,rent',
        'property_type' => 'required|in:apartment,house,office,land,villa,shop,condo,studio,building,warehouse','guesthouse','other',
        'status' => 'required|in:active,inactive,pending,booked',
        'price' => 'required|numeric|min:0',
        'currency' => 'required|in:ETB,USD,GBP',
        'area' => 'required|integer|min:1',
        'bedrooms' => 'nullable|integer|min:0',
        'bathrooms' => 'nullable|integer|min:0',
        'is_furnished' => 'required|boolean',
        'amenities' => 'nullable|array',
        'address_region' => 'required|string',
        'address_city' => 'required|string',
        'address_subcity' => 'required|string',
        'address_specific_area' => 'required|string',
        'latitude' => 'nullable|numeric|between:-90,90',
        'longitude' => 'nullable|numeric|between:-180,180',
        'is_featured' => 'required|boolean',
    ]);

    $property = new Property();
    $property->lister_id = Auth::id(); // or manually assign
    $property->fill($validated);
    $property->amenities = json_encode($validated['amenities'] ?? []);
    $property->save();

    return redirect()->route('properties.index')->with('success', 'Property created successfully.');
}

public function Show($id){

}

    public function update(Request $request, $id)
{
    $property = Property::findOrFail($id);

    if ($property->lister_id !== Auth::id()) {
        return redirect()->back()->with('error', 'You do not have permission to edit this property.');
    }

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'listing_type' => 'required|in:sale,rent',
        'property_type' => 'required|in:apartment,house,office,land,villa,shop,condo,studio,building,warehouse','guesthouse','other',
        'status' => 'required|in:active,inactive,pending,booked',
        'price' => 'required|numeric|min:0',
        'currency' => 'required|in:ETB,USD,GBP',
        'area' => 'required|integer|min:1',
        'bedrooms' => 'nullable|integer|min:0',
        'bathrooms' => 'nullable|integer|min:0',
        'is_furnished' => 'required|boolean',
        'amenities' => 'nullable|array',
        'address_region' => 'required|string',
        'address_city' => 'required|string',
        'address_subcity' => 'required|string',
        'address_specific_area' => 'required|string',
        'latitude' => 'nullable|numeric|between:-90,90',
        'longitude' => 'nullable|numeric|between:-180,180',
        'is_featured' => 'required|boolean',
    ]);

    $property->fill($validated);
    $property->amenities = json_encode($validated['amenities'] ?? []);
    $property->save();

    return redirect()->route('properties.index')->with('success', 'Property updated successfully.');
}

public function destroy($id)
{
    $property = Property::findOrFail($id);

    if ($property->lister_id !== Auth::id()) {
        return redirect()->back()->with('error', 'You do not have permission to delete this property.');
    }

    $property->delete();

    return redirect()->route('properties.index')->with('success', 'Property deleted successfully.');
}
    public function index()
{
    $properties = Property::where('lister_id', Auth::id())->get();

    return view('properties.index', compact('properties'));
}

    public function create()
{
    return view('properties.create');
}

    public function edit($id)
{
    $property = Property::findOrFail($id);

    if ($property->lister_id !== Auth::id()) {
        return redirect()->back()->with('error', 'You do not have permission to edit this property.');
    }

    return view('properties.edit', compact('property'));
}

}
