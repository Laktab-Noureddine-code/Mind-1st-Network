<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    /** @use HasFactory<\Database\Factories\MediaFactory> */
    use HasFactory;
    protected $fillable = [
        'type',
        'body',
        'url',
        'post_id'
    ];

    /**
     * Get the url attribute - ensures relative URL for Vite proxy compatibility
     * Converts absolute URLs (http://...) to relative URLs (/storage/...)
     */
    public function getUrlAttribute($value)
    {
        if (!$value) return $value;
        
        // If already relative, return as-is
        if (str_starts_with($value, '/')) {
            return $value;
        }
        
        // Convert absolute URL to relative by extracting /storage/... path
        if (preg_match('#/storage/.+$#', $value, $matches)) {
            return $matches[0];
        }
        
        return $value;
    }

    public function Post(){
        return $this->belongsTo(Post::class);
    }
}
