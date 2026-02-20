<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'confidentiality',
        'visibility',
        'created_by',
        'cover_image',
        'description',
    ];

    /**
     * Convert absolute URL to relative for Vite proxy compatibility
     */
    public function getCoverImageAttribute($value)
    {
        if (!$value) return $value;
        if (str_starts_with($value, '/')) return $value;
        if (preg_match('#/storage/.+$#', $value, $matches)) {
            return $matches[0];
        }
        return $value;
    }

    // Relation: un groupe appartient à un créateur (user)
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Relation: un groupe a plusieurs membres (pivot enrichi)
    public function members()
    {
        return $this->belongsToMany(User::class, 'group_members')
            ->withPivot('role', 'status', 'joined_at')
            ->withTimestamps();
    }
    public function messages()
    {
        return $this->hasMany(GroupMessage::class);
    }

    public function blogs()
    {
        return $this->morphMany(Blog::class, 'creator');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
