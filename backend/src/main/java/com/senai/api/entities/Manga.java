package com.senai.api.entities;
import com.senai.api.enuns.Demografia;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_manga")
public class Manga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_manga")
    private Long id;

    @NotBlank(message = "O nome do Mangá é obrigatório.")
    @Column(name = "nome_manga", nullable = false, length = 100, unique = true)
    private String nomeManga;

    @Min(value = 1, message = "O volume deve ser maior que 0.")
    @Column(name = "volume", nullable = false)
    private int volume;

    @Min(value = 0, message = "A nota deve ser no mínimo 0.")
    @Max(value = 10, message = "A nota deve ser no máximo 10.")
    @Column(name = "nota", nullable = false)
    private int nota;

    @NotNull(message = "A demografia é obrigatória.")
    @Enumerated(EnumType.STRING)
    @Column(name = "demografia", nullable = false)
    private Demografia demografia;

   
    public Manga() {
    }

    public Manga(Long id, String nomeManga, int volume, int nota, Demografia demografia) {
        this.id = id;
        this.nomeManga = nomeManga;
        this.volume = volume;
        this.nota = nota;
        this.demografia = demografia;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeManga() {
        return nomeManga;
    }

    public void setNomeManga(String nomeManga) {
        this.nomeManga = nomeManga;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public Demografia getDemografia() {
        return demografia;
    }

    public void setDemografia(Demografia demografia) {
        this.demografia = demografia;
    }
}