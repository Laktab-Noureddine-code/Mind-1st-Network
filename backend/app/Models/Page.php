<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /** @use HasFactory<\Database\Factories\PageFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'cover_image_url',
        'profile_image_url',
        'category',
        'website',
        'email',
        'phone',
        'location',
        'user_id',
    ];

    /**
     * Convert absolute URL to relative for Vite proxy compatibility
     */
    protected function toRelativeUrl($value)
    {
        if (!$value) return $value;
        if (str_starts_with($value, '/')) return $value;
        if (preg_match('#/storage/.+$#', $value, $matches)) {
            return $matches[0];
        }
        return $value;
    }

    public function getCoverImageUrlAttribute($value)
    {
        return $this->toRelativeUrl($value);
    }

    public function getProfileImageUrlAttribute($value)
    {
        return $this->toRelativeUrl($value);
    }

    // A Page belongs to a User (owner)
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers_pages')
            ->withTimestamps();
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function admins()
    {
        return $this->belongsToMany(User::class, 'page_admins')
            ->withTimestamps();
    }

    /**
     * Get the blogs created by this page.
     */
    public function blogs()
    {
        return $this->morphMany(Blog::class, 'creator');
    }

    /**
     * Check if a user is an admin of this page.
     */
    public function isAdmin($userId)
    {
        // Implement this method based on your page admin structure
        // For example, if you have a page_admins table:
        return $this->admins()->where('user_id', $userId)->exists();
    }
    public function demandesAdmin()
    {
        return $this->hasMany(DemandeAdmin::class);
    }
}
