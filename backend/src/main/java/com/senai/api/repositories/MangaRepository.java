package com.senai.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senai.api.entities.Manga;

public interface MangaRepository extends JpaRepository<Manga, Long> {

}
