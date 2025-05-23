<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'meta_title',
        'meta_keyword',
        'meta_description',
        'slug',
        'name',
        'description',
        'status',  
    ];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
