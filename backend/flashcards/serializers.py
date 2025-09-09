from rest_framework import serializers
from .models import Term, Flashcard

class TermSerializer(serializers.ModelSerializer):

    class Meta:
        model = Term
        fields = ['t_id', 'question', 'answer']

class FlashcardSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', read_only=True)
    terms = TermSerializer(many=True, read_only=True)

    class Meta:
        model = Flashcard
        fields = ['username', 'f_title', 'terms']


