from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Max
from .models import Flashcard, Term
from .serializers import FlashcardSerializer, TermSerializer

# Create your views here.

class FlascardListView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        flashcards = Flashcard.objects.filter(user=request.user)
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateFlashcardView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format= None):
        
        serializer = FlashcardSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FlashcardUpdateView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, f_id):
        try:
            flashcard = Flashcard.objects.get(f_id=f_id, user=request.user)

        except Flashcard.DoesNotExist:
            return Response({'error': 'Flashcard not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = FlashcardSerializer(flashcard, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FlashcardDeleteView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, f_id):

        try:
            flashcard = Flashcard.objects.get(f_id=f_id, user=request.user)

        except Flashcard.DoesNotExist:
            return Response({'error': 'Flashcard not found'}, status=status.HTTP_404_NOT_FOUND)
        
        flashcard.delete()
        return Response({'message': 'Flashcard deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
class TermListView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, f_id):
        try:
            flashcard = Flashcard.objects.get(f_id=f_id, user=request.user)
        
        except Flashcard.DoesNotExist:
            return Response({'error': 'Flashcard not found'}, status=status.HTTP_404_NOT_FOUND)
        
        terms = Term.objects.filter(flashcard=flashcard, user=request.user)
        serializer = TermSerializer(terms, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateTermView(APIView):
    
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, f_id):
        try:
            flashcard = Flashcard.objects.get(f_id=f_id, user=request.user)
        
        except Flashcard.DoesNotExist:
            return Response({'error': 'Flashcard not found'}, status=status.HTTP_404_NOT_FOUND)
        
        max_tid = Term.objects.filter(user=request.user, flashcard=flashcard).aggregate(Max('t_id'))['t_id__max'] or 0
        next_id = max_tid + 1

        serializer = TermSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, flashcard=flashcard, t_id=next_id)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TermUpdateView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, f_id, t_id):
        try:
            flashcard = Flashcard.objects.get(f_id=f_id, user=request.user)

        except Flashcard.DoesNotExist:
            return Response({'error': 'Flashcard not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            term = Term.objects.get(flashcard=flashcard, user=request.user, t_id=t_id)
        
        except Term.DoesNotExist:
            return Response({'error': 'Term not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TermSerializer(term, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TermDeleteView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, f_id, t_id):

        try:
            flashcard = Flashcard.objects.get(f_id=f_id, user=request.user)

        except Flashcard.DoesNotExist:
            return Response({'error': 'Flashcard not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            term = Term.objects.get(flashcard=flashcard, user=request.user, t_id=t_id)

        except Term.DoesNotExist:
            return Response({'error': 'Term not found'}, status=status.HTTP_404_NOT_FOUND)
        
        term.delete()
        return Response({'message': 'Term deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
