<section id="content">
    <h2>Adicionar vendedor</h2>
    
    
<?php  echo $this->Form->create('Vendedor', array('class' => 'wymupdate', 'inputDefaults' => array(''))); ?>
  
  <div class="column left">
    <section>
        
       <?php echo $this->Form->input('nome', array('placeholder' => 'Nome:')); ?>
        
      <label for="label">
        Label*
      </label>
    
      <div>
        <input id="label" name="label" type="text" placeholder="Only letters" class="required" />
      </div>
    </section>
  
    
</section>
 <?php /*
            echo $this->Form->create('Vendedor', array('inputDefaults' => array('label' => false)));
            echo $this->Form->input('nome', array('placeholder' => 'Nome:'));
            echo $this->Form->input('sobrenome', array('placeholder' => 'Sobrenome:'));
            echo $this->Form->input('username', array('placeholder' => 'Username:'));
            echo $this->Form->input('password', array('placeholder' => 'Senha:'));
            echo $this->Form->input('telefone', array('placeholder' => 'Telefone:'));
            echo $this->Form->input('celular', array('placeholder' => 'Celular:'));
            echo $this->Form->input('endereco', array('placeholder' => 'Endereço:'));
            echo $this->Form->input('cidade', array('placeholder' => 'Cidade:'));
            echo $this->Form->input('estado', array('placeholder' => 'Estado:'));
            echo $this->Form->input('cpf', array('placeholder' => 'CPF:'));
            echo $this->Form->input('rg', array('placeholder' => 'RG:'));
            echo $this->Form->input('nascimento', array('type' => 'date', 'dateFormat' => 'DMY', 'minYear' => 1980, 'maxYear' => date('Y')));
            echo $this->Form->submit('Cadastrar', array('label' => false));
            echo $this->Form->end();
        */ ?>