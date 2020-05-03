@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                 
                <button id='expensesBtn' class='card-header'>Expenses</button>
                <div class="card-body" id='expenses' > </div>
                  
               
              
                  
                   
               
            </div>
        </div>
    </div>
</div>
<script src='js/app.js'></script>
@endsection
