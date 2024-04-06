<?php

namespace App\Policies;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ContactPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'basic' || $user->role === 'maintainer' || $user->role === 'admin' || $user->role === 'super-admin'; //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Contact $contact): bool
    {
        return $user->role === 'basic' || $user->role === 'maintainer' || $user->role === 'admin' || $user->role === 'super-admin';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'maintainer' || $user->role === 'admin' || $user->role === 'super-admin';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Contact $contact): bool
    {
        return $user->role === 'maintainer' || $user->role === 'admin' || $user->role === 'super-admin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Contact $contact): bool
    {
        // Se l'utente è un admin o un super-admin, può cancellare il contatto
        if ($user->role === 'admin' || $user->role === 'super-admin') {
            return true;
        }

        // Se l'utente è un maintainer, può cancellare solo i contatti che ha creato
        if ($user->role === 'maintainer' && $contact->create_by_user_id === $user->id) {
            return true;
        }

        // Se l'utente non ha i permessi, ritorna false
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Contact $contact): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Contact $contact): bool
    {
        //
    }
}
