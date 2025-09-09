from django.db import models, transaction
from django.contrib.auth.models import User

# Create your models here.

class Flashcard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    f_id = models.IntegerField(editable=False)
    f_title = models.CharField(max_length=150)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'f_id'], name='unique_user_fid')
        ]

        db_table = 'flashcards'

    def save(self, *args, **kwargs):
        if self._state.adding and self.f_id is None:
            with transaction.atomic():
                last_flashcard = (
                    Flashcard.objects
                    .select_for_update()
                    .filter(user=self.user)
                    .order_by('-f_id')
                    .first()
                )            
                self.f_id = 1 if not last_flashcard else last_flashcard.f_id + 1
                super().save(*args, **kwargs)    
        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.username} - {self.f_id} - {self.f_title}'

class Term(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE, related_name='terms')
    t_id = models.IntegerField(editable=False)
    question = models.TextField()
    answer = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'flashcard', 't_id'], name='unique_user_flashcard_tid')
        ]

        db_table = "terms"

    
    def save(self, *args, **kwargs):
        if self._state.adding and self.t_id is None:
            with transaction.atomic():
                last_card = (
                    Term.objects
                    .select_for_update()
                    .filter(user=self.user, flashcard=self.flashcard)
                    .order_by('-t_id')
                    .first()
                )
                self.t_id = 1 if not last_card else last_card.t_id + 1
                super().save(*args, **kwargs)
        
        else:
            super().save(*args, **kwargs)
            
    
    def __str__(self):
        return f"{self.user.username} - {self.flashcard.f_id} - {self.t_id}: {self.question[:30]}"
