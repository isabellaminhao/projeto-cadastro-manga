package com.senai.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senai.api.entities.Manga;
import com.senai.api.enuns.Demografia;
import com.senai.api.repositories.MangaRepository;

@Service
public class MangaService {

    @Autowired
    private MangaRepository repository;
    
    public Manga salvar(Manga manga) {

        validarManga(manga);

        return repository.save(manga);
    }
    
    public List<Manga> listarTodos() {
        return repository.findAll();
    }

    public Optional<Manga> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Manga atualizar(Long id, Manga manga) {

        Optional<Manga> mangaExistente = repository.findById(id);

        if (mangaExistente.isPresent()) {

            validarManga(manga);

            Manga mangaAtualizado = mangaExistente.get();

            mangaAtualizado.setNomeManga(manga.getNomeManga());
            mangaAtualizado.setVolume(manga.getVolume());
            mangaAtualizado.setNota(manga.getNota());
            mangaAtualizado.setDemografia(manga.getDemografia());

            return repository.save(mangaAtualizado);
        }

        return null;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    private void validarManga(Manga manga) {

        if (manga.getDemografia() == Demografia.Seinen && manga.getNota() < 5) {

            throw new RuntimeException(
                "Mangás da demografia Seinen devem possuir nota igual ou superior a 5.");
        }
    }
}