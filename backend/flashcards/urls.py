from django.urls import path
from .views import FlascardListView, CreateFlashcardView, FlashcardUpdateView, FlashcardDeleteView, TermListView, CreateTermView, TermUpdateView, TermDeleteView

urlpatterns = [
    path('flashcard_list', FlascardListView.as_view()),
    path('create_flashcard', CreateFlashcardView.as_view()),
    path('<int:f_id>/edit_flashcard', FlashcardUpdateView.as_view()),
    path('<int:f_id>/delete_flashcard', FlashcardDeleteView.as_view()),
    path('<int:f_id>/term_list', TermListView.as_view()),
    path('<int:f_id>/create_term', CreateTermView.as_view()),
    path('<int:f_id>/<int:t_id>/edit_term', TermUpdateView.as_view()),
    path('<int:f_id>/<int:t_id>/delete_term', TermDeleteView.as_view()),

]