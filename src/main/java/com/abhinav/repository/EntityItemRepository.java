//dependencyinjection

package com.abhinav.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhinav.model.*;

@Repository
public interface EntityItemRepository extends JpaRepository<ItemEntity, Number > {

}
